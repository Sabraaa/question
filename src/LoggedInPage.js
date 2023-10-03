import React, { useEffect, useState } from "react";

function LoggedInPage() {
  const [data, setData] = useState("");

  const processHtml = (html) => {
    return html.replace(/<i>(.*?)<\/i>/g, "$1");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://shserver.top:8080/test/users/getData",
          {
            method: "GET",
            headers: {
              ticket: "YOUR_TICKET",
            },
          }
        );

        if (response.status === 200) {
          const result = await response.json();

          setData(result.result);
        } else {
          console.error("API error:", response.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: processHtml(data) }} />
    </div>
  );
}

export default LoggedInPage;
