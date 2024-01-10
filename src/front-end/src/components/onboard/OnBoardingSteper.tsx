import React from 'react'
import theme from '../../theme'
import { Box, Container, Drawer, Step, StepLabel, Stepper, useMediaQuery } from '@mui/material';
import { Logo } from '../common/logo';

const styles = {
  stepLabel: { // 调整字体大小
    fontSize: '3rem', // 或其他你想要的大小
  },
  stepIcon: { // 调整图标大小
    fontSize: '3rem', // 或其他你想要的大小
    // 你也可以通过width和height来调整图标大小，如果它们是SVG或字体图标
  },
};

interface OnBoardingSteperProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}


const OnBoardingSteper: React.FC<OnBoardingSteperProps> = ({ activeStep, setActiveStep }) => {
  const steps = ['Basic Infomation', 'Reference', 'Emergency Contact', 'Upload Documents'];
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  if(!isMobile){
  return (
    <Container>
      <Drawer
        variant='permanent'
        anchor='left'
        sx={{
          width: '30vw',
          flexShrink: 0,
          overflow: 'auto',
          backgroundColor: theme.palette.primary.main,
        }}
        PaperProps={{
          style: {
            width: '30vw',
            height: '100vh',
            backgroundColor: theme.palette.primary.main,
          },
        }}
        >
          <Logo /> 
          <Box
            sx={{
              height: '10vh',
            }}
          >
          </Box>     
          <Stepper activeStep={activeStep} 
            orientation="vertical" style={{ height: '50%', overflow: 'auto',}}

          >
            {steps.map((label) => (
              <Step key={label}  >
                <StepLabel style={styles.stepLabel}
                StepIconProps={{
                  style: styles.stepIcon, // 应用图标样式
                }}
                >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Drawer>
    </Container>
  )
  }else{
    return(
      <Container>
        <Stepper activeStep={activeStep} orientation="horizontal" alternativeLabel>
          {steps.map((label) => (
            <Step key={label}  >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    )
  }
}
export default OnBoardingSteper;