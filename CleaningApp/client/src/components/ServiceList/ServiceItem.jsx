import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SERVICEINFO_ROUTE } from "../../utils/constants";

const ServiceItem = ({ service }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 700 }} className='service-card'>
      <CardContent>
        <Typography color='text.secondary' gutterBottom>
          Сервис
        </Typography>
        <Typography variant='h4' component='div'>
          {service.title}
        </Typography>
        <Typography variant='h6'>{service.price} руб.</Typography>
        <Typography variant="subtitle2">
          <Rating className='rating' readOnly value="5"></Rating>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          style={{ fontSize: "1.5rem" }}
          onClick={() => navigate(SERVICEINFO_ROUTE + "/" + service.id)}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceItem;
