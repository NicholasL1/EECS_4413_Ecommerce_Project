"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSitemap,
  faUser,
  faCreditCard,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useState } from "react";
import {isUserLoggedIn} from '../../lib/utils'
import AccessDenied from "@/components/AccessDenied";

const AccountPage = () => {

  if (!isUserLoggedIn())
    return <AccessDenied/>

  const [hoverIndex, setHoverIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const items = [
    {
      title: "Your Orders",
      description: "See all of your order history",
      icon: faSitemap,
      link: "/userOrderPage",
    },
    {
      title: "Profile Information",
      description: "View your account details",
      icon: faUser,
      link: "/profilePage",
    },
    {
      title: "Your Payments",
      description: "View all payments for your account",
      icon: faCreditCard,
      link: "/paymentPage",
    },
    {
      title: "Your Reviews",
      description: "View all product reviews you've made",
      icon: faComment,
      link: "/userReviews",
    },
  ];

  const accountStyles = {
    box: {
      height: "200px",
      width: "200px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "30px",
      cursor: "pointer",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem 1rem",
    },
    header: {
      color: "#dd2c2c",
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "1.5rem",
    },
    card: {
      border: "1px solid #272f29",
      borderRadius: "0.5rem",
      padding: "1rem",
      transition: "box-shadow 0.3s ease, background-color 0.3s ease",
      cursor: "pointer",
      backgroundColor: "#e8e7ee",
    },
    cardHover: {
      backgroundColor: "#d3d3d3",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    icon: {
      fontSize: "1.5rem",
      color: "#dd2c2b",
      marginRight: "0.75rem",
    },
    cardTitle: {
      fontSize: "1.25rem",
      fontWeight: "500",
    },
    cardDescription: {
      color: "#300",
    },
  };

  return (
    <div style={accountStyles.container}>
      <h1 style={accountStyles.header}>Your Account</h1>
      <div
        style={{
          ...accountStyles.grid,
        }}
      >
        {items.map((item, index) => (
          <Link href={item.link} key={index} passHref>
            <div
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{
                ...accountStyles.card,
                ...(hoverIndex === index ? accountStyles.cardHover : {}),
              }}
            >
              <div style={accountStyles.cardHeader}>
                <FontAwesomeIcon icon={item?.icon} style={accountStyles.icon} />
                <h2 style={accountStyles.cardTitle}>{item.title}</h2>
              </div>
              <p style={accountStyles.cardDescription}>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccountPage;
