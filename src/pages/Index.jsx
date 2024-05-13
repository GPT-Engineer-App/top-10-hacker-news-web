import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Heading, Text, Link, Spinner } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const storyIds = await response.json();
      const topTenStoryIds = storyIds.slice(0, 10);

      const storyPromises = topTenStoryIds.map((id) => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) => res.json()));

      const stories = await Promise.all(storyPromises);
      setStories(stories);
      setIsLoading(false);
    };

    fetchTopStories();
  }, []);

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          Top 10 Hacker News Stories
        </Heading>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          stories.map((story) => (
            <Box key={story.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" width="100%">
              <Heading fontSize="xl">{story.title}</Heading>
              <Text mt={4}>
                {story.score} points by {story.by}
              </Text>
              <Link href={story.url} isExternal color="blue.500">
                Read more <FaExternalLinkAlt />
              </Link>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;
