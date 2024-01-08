"use client";

import { Box, Card, CardBody, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const algoliasearch = require("algoliasearch");

const client = algoliasearch("LLXXWXI65M", "054d88bb5d5242752daecc46182e3ca6");
const index = client.initIndex("my_blog");

interface SearchData {
  name: string;
  api: string;
}

export default function SearchPage() {
  // menampung data pencarian
  const [search, setSearch] = useState<SearchData[]>([]);
  const [keyword, setKeyword] = useState("");

  const handleInput = (input: string) => {
    // console.log("input: ", input);
    setKeyword(input);
    index
      .search(input)
      .then(({ hits }: any) => {
        // console.log("search : ", hits);
        setSearch(hits);
      })
      .catch((err: any) => {
        console.log("error : ", err);
      });
  };


  return (
    <div className="container">
      <Box p={4} w={"full"} bg={"gray.200"} minH={100}>
        <Box maxW={"xl"}>
          <Card>
            <CardBody>
              <Input
                placeholder="Search"
                onChange={(e) => {
                  handleInput(e.target.value);
                }}
              />
            </CardBody>
          </Card>
          {keyword !== "" && search.length ? (
            <>
              <Card mt={4}>
                <CardBody>
                  {search.map((item, i) => (
                    <Box key={i} my={3}>
                      <Text>{item.name}</Text>
                    </Box>
                  ))}
                </CardBody>
              </Card>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </div>
  );
}
