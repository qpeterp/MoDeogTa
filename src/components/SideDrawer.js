import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { FaBook, FaArrowRight } from "react-icons/fa"; // 글쓰기, 필기 느낌
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function SideDrawer({ onTextSelect }) {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState([]);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleChoice = async (id) => {
    try {
      // 특정 문서를 불러오기 위해 'doc'을 사용하고 'getDoc'으로 문서 데이터를 가져옴
      const docRef = doc(db, "typingScript", id); // 컬렉션 'typingScript'에서 id에 해당하는 문서
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        // 문서가 존재하는 경우
        console.log("Document data:", docSnapshot.data());
        setOpen(false);
        onTextSelect(docSnapshot.data().script);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  // 첫 렌더링 시에만 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchDocuments = async () => {
      const typingList = await getAllDocument();
      if (typingList) {
        setDocuments(typingList); // 가져온 문서를 상태에 저장
      }
    };

    fetchDocuments(); // 컴포넌트가 처음 마운트될 때만 호출
  }, []); // 빈 배열을 두 번째 인자로 넣어 첫 렌더링 시에만 실행되도록 설정

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
            width: "45vw",
            backgroundColor: "#272727", // 배경색 검은색으로 설정
          }, // 전체 Drawer 크기 조절
        }}
      >
        <List className="list-container">
          {documents.map((doc, index) => (
            <ListItem button key={index} onClick={() => handleChoice(doc.id)}>
              <ListItemText
                primary={doc.script}
                sx={{
                  color: "white",
                  "&:hover": { color: "yellow", backgroundColor: "#434343" },
                  padding: "16px 24px",
                }} // 글자 색을 흰색으로 변경
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

async function getAllDocument() {
  try {
    const querySnapshot = await getDocs(collection(db, "typingScript"));
    const docs = [];

    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });

    if (docs.length === 0) {
      console.log("No documents found in the collection.");
      return null;
    }

    return docs;
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}

export default SideDrawer;
