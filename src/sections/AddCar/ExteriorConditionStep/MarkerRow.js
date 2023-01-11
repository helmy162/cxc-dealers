import { IconButton, ListItemText, ListItem } from "@mui/material";
import { useCallback } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function MarkerRow ({ id, marker, onDeleteButtonClick }) {
  const deleteMarker = useCallback(() => {
    onDeleteButtonClick(id)
  }, [id, onDeleteButtonClick]);

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={deleteMarker}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={`${id + 1} ${marker.defect}`}/>
    </ListItem>
  )
}
