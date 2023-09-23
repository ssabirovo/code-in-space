import { IconProps, Modal } from "@mui/material";
import Icon from "../../../assets/icons/icons";
import { useState } from "react";
import cls from "./content.module.scss";

interface IBasicModalProps {
  Button?: React.ReactElement<IconProps>;
}

const BasicModal: React.FC<IBasicModalProps> = ({ Button }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    console.log("afafaf");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        onClick={(e) => {
          handleOpen(e);
        }}
      >
        {Button}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className={cls.wrapper}>
            <div className={cls.navbar}>
              <Icon name="RedPlanet" />
              <Icon name="YellowPlanet" />
              <Icon name="GreenPlanet" />
            </div>
            <div className={cls.content}>
              <h3>Delete problem</h3>
              <p>
                Are you sure you want to delete “doubleChar” ? This action can't
                be undone.
              </p>
              <div className={cls.btns}>
                <button onClick={handleClose}>Cancel</button>
                <button className="">Delete</button>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default BasicModal;
