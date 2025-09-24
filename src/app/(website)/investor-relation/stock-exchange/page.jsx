"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import pb from "../../_lib/pb";

const StockExchange = () => {
  const [loading, setLoading] = useState(true);
  const [stockExchangeInfo, setStockExchangeInfo] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockExchangeInfoRes = await pb
          .collection("meetings_policies_stock_exchange_open_offer")
          .getFullList(200, {
            sort: "sno",
            filter: 'page = "stock"',
            requestKey: null,
          });

        setStockExchangeInfo(stockExchangeInfoRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="h-dvh flex justify-center items-center bg-white">
        <div className="relative w-32 h-32 flex justify-center items-center">
          {/* Spinning border */}
          <div className="absolute w-full h-full border-4 border-gray-300 border-t-[#152768] rounded-full animate-spin"></div>

          {/* Logo inside */}
          <img
            src="/images/logo.png"
            alt="Spice Lounge Logo"
            className="w-20 h-20 object-contain"
          />
        </div>
      </div>
    );

  // ✅ Use correct pathname for Stock Exchange page
  const isActive = pathname === "/investor-relation/stock-exchange";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isActive && stockExchangeInfo.length > 0 && (
        <>
          <header className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#223972] border-b-2 border-gray-300 pb-2 inline-block">
              Stock Exchange Filings
            </h2>
          </header>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
            {stockExchangeInfo.map((info) => {
              const fileUrl = pb.files.getURL(info, info.file);
              return (
                <div key={info.id} className="text-red-600 font-medium">
                  {info.title} –{" "}
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-800"
                  >
                    Click Here
                  </a>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default StockExchange;