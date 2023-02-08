import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  paper: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 9
  },
  root: {
    '& .MuiTextField-root': { margin: 1 }
  },
  avatar: {
    margin: 1
  },
  form: {
    width: '100%',
    marginTop: 3
  }
}));