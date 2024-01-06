import { Stack, Typography } from "@mui/material";

export const Logo = () => {
  return (
    <Stack alignItems="baseline" direction="row" spacing={0.5}>
      <Typography sx={{ fontSize: '32px', fontFamily: 'Inria Serif', fontWeight: 'bold'}}>Chuwa </Typography>
      <Typography sx={{ fontSize: '16px', fontFamily: 'Inria Serif' }}>EM System</Typography>
    </Stack>
  );
};
