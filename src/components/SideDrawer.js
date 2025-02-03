import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { FaBook, FaArrowRight } from "react-icons/fa"; // 글쓰기, 필기 느낌

function SideDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <div className="list">
      <div className="iconBundle" onClick={toggleDrawer(true)}>
        <FaBook
          variant="contained"
          style={{
            width: "36px",
            height: "36px",
            color: "yellow", // 아이콘 색상
          }}
        />
        <FaArrowRight
          variant="contained"
          style={{
            width: "12px",
            height: "12px",
            color: "black", // 아이콘 색상
            backgroundColor: "yellow", // 배경 색상
            borderRadius: "50%", // 원 모양 만들기
            padding: "5px",
          }}
        />
      </div>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // 성능 최적화 (선택 사항)
        }}
        PaperProps={{
          sx: {
            width: "50vw",
            backgroundColor: "#272727", // 배경색 검은색으로 설정
          }, // 전체 Drawer 크기 조절
        }}
      >
        <List>
          {[
            "죽어라 이 거머리야.",
            "하 인생. ",
            "애국가 1. 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.",
            "음 아잇",
          ].map((text, index) => (
            <ListItem button key={index}>
              <ListItemText
                primary={text}
                sx={{
                  color: "white",
                  "&:hover": { color: "yellow", backgroundColor: "#434343" },
                  padding: "12px 8px",
                }} // 글자 색을 흰색으로 변경
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default SideDrawer;
