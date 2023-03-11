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
        onDeleteButtonClick?
        <IconButton edge="end" aria-label="delete" onClick={deleteMarker}>
          <DeleteIcon />
        </IconButton>
        :
        null
      }
    >
      <div className="flex items-center justify-center">
        <div  className='w-[22px] h-[22px] text-[14px] flex items-center justify-center bg-[brown] rounded-full text-white text-center  '>
          {id+1}
        </div>
        <p className="ml-3">
          {marker.defect}
        </p>
      </div>
    </ListItem>
  )
}
