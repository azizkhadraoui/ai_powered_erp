import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Dashboard = () => {
  return (
    <Stack spacing={3} sx={{ padding: 3 }}>
      <TasksProgress value={75} />
      <Revenue value={50000} />
      <UserGrowth value={1200} />
      <Notifications value={5} />
    </Stack>
  );
};

export interface TasksProgressProps {
  value: number;
}

const TasksProgress: React.FC<TasksProgressProps> = ({ value }) => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Task Progress
              </Typography>
              <Typography variant="h4">{value}%</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'warning.main', height: 56, width: 56 }}>
              <ListAltIcon fontSize="large" />
            </Avatar>
          </Stack>
          <LinearProgress value={value} variant="determinate" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export interface RevenueProps {
  value: number;
}

const Revenue: React.FC<RevenueProps> = ({ value }) => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Revenue
              </Typography>
              <Typography variant="h4">${value.toLocaleString()}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'success.main', height: 56, width: 56 }}>
              <AttachMoneyIcon fontSize="large" />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export interface UserGrowthProps {
  value: number;
}

const UserGrowth: React.FC<UserGrowthProps> = ({ value }) => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" gutterBottom variant="overline">
                New Users
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'info.main', height: 56, width: 56 }}>
              <PersonAddIcon fontSize="large" />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export interface NotificationsProps {
  value: number;
}

const Notifications: React.FC<NotificationsProps> = ({ value }) => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Notifications
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'error.main', height: 56, width: 56 }}>
              <NotificationsIcon fontSize="large" />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
