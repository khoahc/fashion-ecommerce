import { Box, CircularProgress } from "@mui/material";

const LoadingTableContent = ({ colSpan }) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </td>
    </tr>
  );
};

export default LoadingTableContent;
