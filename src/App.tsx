import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowsIcon } from "./components/Icons.tsx";
import { LanguageSelector } from "./components/LanguageSelector.tsx";
import { useStore } from "./hooks/useStore.ts";
import { AUTO_LANGUAGE } from "./constants.ts";
import { SectionType } from "./types.d.ts";

function App() {
  const {
    fromLanguage,
    toLanguage,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
  } = useStore();

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <LanguageSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
