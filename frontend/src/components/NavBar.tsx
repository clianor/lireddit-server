import React, {useEffect} from "react";
import {Box, Button, Flex, Link} from "@chakra-ui/core";
import {useLogoutMutation, useMeQuery} from "../generated/graphql";
import NextLink from "next/link";
import {useRouter} from "next/router";

interface NavBarProps {
}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [logout, {loading: logoutLoading}] = useLogoutMutation();
  const {data, loading} = useMeQuery();
  let body = null;

  useEffect(() => {
    console.log();
  }, [logoutLoading]);

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
        <Button
          onClick={async () => {
            const result = await logout()
              .then((response) => response.data?.logout)
              .catch((error) => console.error(error));

            if (result) {
              await router.push("/")
            }
          }}
          isLoading={logoutLoading}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    )
  }

  return (
    <Flex bg="tan" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
}
