import React from "react";
import {Box, Button, Flex, Link} from "@chakra-ui/core";
import {useMeQuery} from "../generated/graphql";
import NextLink from "next/link";

interface NavBarProps {
}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const {data, loading} = useMeQuery();
  let body = null;

  if (loading) { // data loading

  } else if (!data?.me) { // user not logged in
    body = (
      <>
        <NextLink href="/auth/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/auth/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else { // user is logged in
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    )
  }

  return (
    <Flex bg="tan" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
}
