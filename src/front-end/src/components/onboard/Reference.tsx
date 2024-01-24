import { Container, Grid } from '@mui/material'
import PersonInfo from './Personinfo'

export default function Reference() {
  return (
    <Container>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <PersonInfo tableName="Reference"/>
            </Grid>
        </Grid>
    </Container>
  )
}
