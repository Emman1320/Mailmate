import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import os.path
import os
import google.auth
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from email.message import EmailMessage
from email.mime.text import MIMEText
import base64

app = Flask(__name__)
CORS(app)
SCOPES = ['https://www.googleapis.com/auth/gmail.compose']


@app.route('/authorize', methods=["GET"])
def authorize():
    """Shows basic usage of the Docs API.
    Prints the title of a sample document.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        # creds = Credentials.from_authorized_user_file('token.json', SCOPES)
        os.remove("token.json")
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=3001)
            
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            tokenDict = json.loads(creds.to_json())
            tokenDict["type"] = "authorized_user"
            token.write(json.dumps(tokenDict, indent=4))
    return {"status": "success"}


@app.route('/sendmessage', methods=["POST"])
def gmail_send_message():
    """Create and send an email message
    Print the returned  message id
    Returns: Message object, including message id

    Load pre-authorized user credentials from the environment.
    TODO(developer) - See https://developers.google.com/identity
    for guides on implementing OAuth2 for the application.
    """
    req = json.loads(request.data)
    responseMessage = {"status": {}, "connectionError": False}

    creds, _ = google.auth.load_credentials_from_file(
        "token.json", scopes=SCOPES)
    # credentials = Credentials.from_authorized_user_info(
    #     info=req["token_info"], scopes=SCOPES
    # )

    service = build('gmail', 'v1', credentials=creds)
    messagesList = req["messages"]
    for i in range(len(messagesList)):
        try:
            message = MIMEText(messagesList[i]["html"], "html")
            message['To'] = messagesList[i]["to"]
            message['From'] = req["from"]
            message['Subject'] = req["subject"]

            # encoded message
            encoded_message = base64.urlsafe_b64encode(message.as_bytes()) \
                .decode()

            create_message = {
                'raw': encoded_message
            }
            # pylint: disable=E1101
            send_message = (service.users().messages().send
                            (userId="me", body=create_message).execute())

            responseMessage['status'][messagesList[i]["id"]] = {
                "email": messagesList[i]["to"], "status": True}

            print(F'Message Id: {send_message["id"]}')

        except Exception as error:
            print(F'An error occurred: {error}')
            responseMessage['status'][messagesList[i]["id"]] = {
                "email": messagesList[i]["to"], "status": False}
    return responseMessage


if __name__ == "__main__":
    app.run(port=8080)

# from google.oauth2 import credentials

#     try:
#         credentials = credentials.Credentials.from_authorized_user_info(
#             info, scopes=scopes
#         )
#     except ValueError as caught_exc:
#         msg = "Failed to load authorized user credentials from {}".format(filename)
#         new_exc = exceptions.DefaultCredentialsError(msg, caught_exc)
#         six.raise_from(new_exc, caught_exc)
