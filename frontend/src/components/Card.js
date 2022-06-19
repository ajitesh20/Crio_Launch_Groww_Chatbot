import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

function Card1({ category, id, img, cardname, cardprice, cardrate }) {
  return (
    <Container>
      {category === "Stocks" ? (
        <Link to={`/stock/${id}`}>
          <Card className="card">
            <CardMedia
              component="img"
              height="150"
              image={img}
              alt={cardname}
              style={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography gutterBottom variant="body2" component="div">
                {cardname}
              </Typography>
              <Typography variant="subtitle2">

                <div className="price-change">
                  ₹{cardprice}
                  <br></br>
                  {cardrate}
                </div>

              </Typography>
            </CardContent>

            <CardActions>
              <Button
                style={{
                  backgroundColor: "#00a278",
                  color: "white",
                  width: "100%",
                }}
              >
                BUY NOW
              </Button>
            </CardActions>
          </Card>
        </Link>
      ) : (
        <Link to={`/mutual-fund/${id}`}>
          {/* <img src={img} alt="funds"></img>
          <CardName>{cardname}</CardName>
          <CardPrice>{cardprice}</CardPrice>
          <CardRate>{cardrate}</CardRate> */}
          <Card className="card">
            <img src={img} alt="funds"></img>
            <CardContent>
              <Typography gutterBottom variant="body2" component="div">
                {cardname}
              </Typography>
              <Typography variant="subtitle2">

                <div className="price-change">
                  ₹{cardprice}
                  <br></br>
                  {cardrate}
                </div>

              </Typography>
            </CardContent>

            <CardActions>
              <Button
                style={{
                  backgroundColor: "#00a278",
                  color: "white",
                  width: "100%",
                }}
              >
                BUY NOW
              </Button>
            </CardActions>
          </Card>
        </Link>
      )}
    </Container>
  );
}

export default Card1;

const Container = styled.div`
  min-height: 190px;
  min-width: 168px;
  width: 100%;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 15px;
  padding-top: 15px;
  border-radius: 8px;
  margin-right: 15px;
  box-shadow: 0 1px 5px 0 lightgrey;
  align-items: center;

  img {
    width: 60px;
    height: 50px;
    object-fit: contain;
    margin-bottom: 42px;
  }
`;

const CardName = styled.h3``;

const CardPrice = styled.h3``;

const CardRate = styled.h3`
  color: #00d09c;
`;
