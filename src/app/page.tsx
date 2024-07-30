import Image from "next/image";
import Button from '@mui/material/Button';
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-24">
        <ArticleList />
      </main>
    </>
  );
}
