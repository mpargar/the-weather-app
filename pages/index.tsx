import Head from "next/head";
import FloatingLogos from "@/components/FloatingLogos/FloatingLogos";
// import "@/styles/App.module.scss";
import styles from "@/styles/App.module.scss";
import Logo from "@/components/Logo/Logo";
import { useState } from "react";
import useSearch from "../hooks/useSearch";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Results from "@/components/Results/Results";
export default function Home() {
  const [address, setAddress] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(7);
  const { handleSearch, loading, message, results } = useSearch(address);
  return (
    <div className={styles.App}>
      <Head>
        <title>The weather app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FloatingLogos />
        <Logo />
        <form onSubmit={handleSearch} data-testid="search-form">
          <Input
            id="address"
            placeholder="Insert an address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
            message={message}
            postponeComponent={
              <>
                <Button
                  styleType="primary"
                  style={{
                    height: "100%",
                    minWidth: "100px",
                    borderRadius: "0 30px 30px 0",
                  }}
                  type="submit"
                  loading={loading}
                >
                  Search <img src="/img/searchIcon.svg" alt="Search icon" />
                </Button>
              </>
            }
          />
        </form>
        <Results results={results} numberOfDaysToShow={numberOfDays} />
      </main>
    </div>
  );
}
