import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Fab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // 글쓰기 버튼 아이콘

const SuggestBoard = () => {
  // 게시글 리스트 (샘플 데이터)
  const posts = useState([
    {
      id: 1,
      title:
        "애국가 1. 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.",
      likes: 1234567,
    },
    { id: 2, title: "죽어라 이 거머리야", likes: 1234567 },
    { id: 3, title: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", likes: 1234567 },
    {
      id: 4,
      title:
        "애국가 1. 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.",
      likes: 1234567,
    },
    { id: 5, title: "하지만 행복하다면 OK 입니다.", likes: 1234567 },
  ]);

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 상단 제목 */}
      <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: "40px" }}>
        TypingScript
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        모두와 함께할 연습글을 공유하세요!
      </Typography>

      {/* 게시글 목록 */}
      <Container maxWidth="lg" sx={{ paddingBottom: "80px" }}>
        <List>
          {posts.map((post) => (
            <ListItem
              key={post.id}
              sx={{
                borderBottom: "1px solid #444",
                padding: "12px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText primary={post.title} sx={{ color: "white" }} />
            </ListItem>
          ))}
        </List>
      </Container>

      {/* 페이지네이션 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: "50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "18px", color: "#f5f5f5" }}>
          {"< 1/9760 >"}
        </Typography>
      </Box>

      {/* 글쓰기 버튼 (우측 하단) */}
      <Fab
        sx={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          backgroundColor: "yellow",
          color: "black",
          "&:hover": { backgroundColor: "#ffcc00", color: "black" },
        }}
      >
        <EditIcon />
      </Fab>
    </Box>
  );
};

export default SuggestBoard;
