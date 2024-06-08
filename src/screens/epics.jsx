import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EpicsPage = () => {
  // Example data for epics
  const epics = [
    {
      id: 1,
      title: 'User Profiling and Preference Analysis',
      description: 'Develop a robust system to create comprehensive user profiles by analyzing past orders, dietary restrictions, favorite cuisines, and meal preferences. Utilize machine learning algorithms to continuously refine and update these profiles based on user interactions. This epic aims to lay the foundation for delivering highly personalized meal recommendations to enhance user satisfaction and engagement.',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Intelligent Recommendation Engine',
      description: 'Implement an AI-powered recommendation engine capable of suggesting tailored meal options to users in real-time. Utilize data analytics, user feedback, and machine learning techniques to refine the recommendation algorithms. The goal is to provide users with a curated selection of dishes that align with their preferences, dietary requirements, and even contextual factors such as time of day or weather conditions, enhancing the overall dining experience.',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Enhanced User Experience and Engagement',
      description: " Focus on optimizing the user journey by integrating features such as intuitive search functionalities, seamless communication channels between users and restaurants, and real-time order tracking. Enhance the app's usability with intuitive UI/UX design principles to ensure effortless navigation and a visually appealing interface. Additionally, prioritize the implementation of secure payment gateways and data encryption protocols to guarantee user privacy and transaction security. This epic aims to elevate user satisfaction, retention, and overall app engagement through a seamless and delightful user experience.",
      status: 'In Progress',
    },
  ];

  return (
    <Stack spacing={3} sx={{ padding: 3 }}>
      {epics.map((epic) => (
        <Card key={epic.id}>
          <CardHeader
            title={epic.title}
            subheader={`Status: ${epic.status}`}
            avatar={
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <ListAltIcon />
              </Avatar>
            }
          />
          <CardContent>
            <Typography variant="body1" paragraph>
              {epic.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Status
            </Typography>
            <Chip
              icon={<CheckCircleIcon />}
              label={epic.status}
              color={epic.status === 'Completed' ? 'success' : 'warning'}
            />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default EpicsPage;
