import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NEWSDETAIL_ROUTE } from "../../utils/constants";

const NewItem = ({ currentNew }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 400}} className='new-card'>
      <CardMedia
        component='img'
        height='200'
        image={process.env.REACT_APP_API_URL + currentNew.img}
        alt='news img'
      />
      <CardContent>
        <Typography variant='h4' component='div'>
          {currentNew.title}
        </Typography>
        <Typography variant='subtitle2'></Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          style={{ fontSize: "1.5rem" }}
          onClick={() => navigate(NEWSDETAIL_ROUTE + "/" + currentNew.id)}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewItem;
