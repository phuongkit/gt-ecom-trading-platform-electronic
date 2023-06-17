import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: 'auto',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
  content: {
    padding: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(2),
    fontSize: 14,
    color: '#333'
  },
  fee: {
    fontWeight: 'bold',
    color: '#e7158d',

  },
  button: {
    marginTop: theme.spacing(1.5),
    textAlign: 'center',
    backgroundColor:'#94c292',
  },
  cardHeader: {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ddd',
    padding: theme.spacing(2),
  },
  cardHeaderText: {
    fontWeight: 'bold',
    fontSize: '1.7rem',
    color:'#db1242',
    textAlign: 'center'
  },
  time: {
    fontSize: 14,
    marginBottom: theme.spacing(1),
    color: '#333895fa',
  },
}));

const SaleService = ({ title, time, description, image, fee }) => {
  const classes = useStyles();
  title = "Gói tháng thường", description="Bạn có thể đăng bán sản phẩm trên sàn giao dịch của chúng tôi với tối đa 50 sản phẩm trong thời gian 1 Tháng.", image="https://ms-f7-sites-prod-cdn.akamaized.net/docs/stories/799531-geojit-financial-services-banking-capital-markets-dynamics-365/resources/f43163e3-32bc-495e-b2a5-0976b313992b/1272235708472395320_1272235708472395320", fee="1000000.00"
  time = "1 Tháng"
  const handlePurchase = () => {
    // Handle purchase logic here
  };

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader} title={title}  classes={{
          title: classes.cardHeaderText,
        }}/>
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary" className={classes.description}>
          {description}
        </Typography>
        <Typography variant="body2" className={classes.time}>
          Time: {time}
        </Typography>
        <Typography variant="h6" component="p" className={classes.fee}>
          Fee: {fee}
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handlePurchase}
        >
          Purchase
        </Button>
      </CardContent>
    </Card>
  );
};

export default SaleService;
