'use client';

import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  CardContent,
  Collapse,
  IconButton,
  IconButtonProps,
  Stack,
  styled,
  Typography,
} from '@mui/material';

interface CustomProps {
  content: Content;
}

export default function ExerciseMenu({ content }: CustomProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return <></>;
}
