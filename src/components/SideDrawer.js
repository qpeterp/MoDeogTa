import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { FaBook, FaArrowRight, FaSortAmountDown } from "react-icons/fa"; // 글쓰기, 필기 느낌
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SideDrawer({ onTextSelect }) {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [drawerWidth, setDrawerWidth] = useState(45);
  const [isDragging, setIsDragging] = useState(false);

  const FAILED_LOAD_SCRIPT = "전체글을 불러오려다 말았습니다.";

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const sortWithLength = () => {
    console.log("길이 순 정렬 클릭");
    setFilteredDocuments(
      filteredDocuments.toSorted((a, b) => a.script.length - b.script.length)
    );
  };

  const sortWithAlphabetically = () => {
    console.log("가나다 순 정렬 클릭");
    setFilteredDocuments(
      filteredDocuments.toSorted((a, b) => a.script.localeCompare(b.script))
    );
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

  useEffect(() => {
    // 검색어가 있을 때만 필터링
    if (searchText.trim() === "") {
      setFilteredDocuments(documents); // 검색어가 비어 있으면 전체 문서 출력
    } else {
      setFilteredDocuments(
        documents.filter((text) => {
          return text.script.toLowerCase().includes(searchText.toLowerCase());
        })
      );
    }
  }, [searchText, documents]); // searchText가 변경될 때마다 실행

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isDragging) return;

      // 현재 X 좌표 (화면 전체 기준)
      const x = event.clientX;
      const maxX = document.documentElement.clientWidth; // 최대 X 좌표 (예: 화면 오른쪽 끝)

      const newX = (x * 100) / maxX;

      setDrawerWidth(Math.min(85, Math.max(37, newX)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, drawerWidth]);

  // 첫 렌더링 시에만 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchDocuments = async () => {
      const typingList = await getAllDocument();
      if (typingList) {
        setDocuments(typingList); // 가져온 문서를 상태에 저장
        setFilteredDocuments(typingList); // 가져온 문서를 상태에 저장
      }
    };

    fetchDocuments(); // 컴포넌트가 처음 마운트될 때만 호출
  }, []); // 빈 배열을 두 번째 인자로 넣어 첫 렌더링 시에만 실행되도록 설정

  return (
    <div className="list">
      <div className="iconBundle" onClick={toggleDrawer(true)}>
        <FaBook variant="contained" className="side-drawer-icon" />
        <FaArrowRight variant="contained" className="side-drawer-arrow" />
      </div>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // 성능 최적화 (선택 사항)
        }}
        style={{}}
        PaperProps={{
          style: {
            backgroundColor: "var(--background-color)", // CSS 변수 사용
            height: "100vh",
            width: `${drawerWidth}vw`,
            overflow: "hidden",
            flexDirection: "row",
          },
        }}
      >
        <div className="someUltimateCls">
          <div className="allScriptHeader">
            <TextField
              variant="outlined"
              fullWidth
              label="글 검색"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="custom-textfield"
              autoComplete="off"
            />
            <IconButton>
              <SearchIcon className="color" />
            </IconButton>

            <div className="sortIcon">
              <FaSortAmountDown style={{ width: "24px", height: "24px" }} />
              <div className="dropdown-content">
                <p onClick={sortWithLength}>길이 순 정렬</p>
                <p onClick={sortWithAlphabetically}>가나다 순 정렬</p>
              </div>
            </div>
          </div>

          <List className="list-container">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleChoice(doc.id)}
                  style={{ padding: "0" }}
                >
                  <ListItemText
                    primary={doc.script}
                    className="typing-script-item"
                  />
                </ListItem>
              ))
            ) : (
              <ListItem
                button
                key={0}
                onClick={() => {
                  setOpen(false);
                  onTextSelect(FAILED_LOAD_SCRIPT);
                }}
              >
                <ListItemText
                  primary={FAILED_LOAD_SCRIPT}
                  className="typing-script-item"
                />
              </ListItem>
            )}
          </List>
        </div>
        <div className="divider" onMouseDown={handleMouseDown}>
          <div className="clickable" />
        </div>
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
