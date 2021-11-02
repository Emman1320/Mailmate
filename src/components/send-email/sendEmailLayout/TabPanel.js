import { Box } from "@material-ui/core";
function TabPanel(props) {
  return (
    <div
      role="tabpanel"
      hidden={props.value !== props.index}
      id={`simple-tabpanel-${props.index}`}
      aria-labelledby={`simple-tab-${props.index}`}
      {...props.other}
    >
      {props.value === props.index && (
        <Box>
          <div>{props.children}</div>
        </Box>
      )}
    </div>
  );
}
export default TabPanel;
