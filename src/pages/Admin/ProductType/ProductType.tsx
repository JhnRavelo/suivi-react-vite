import { useParams } from "react-router-dom";
import useProductType from "../../../hooks/useProductType";
import "./productType.scss";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useEffect } from "react";

const ProductType = () => {
  const newPlugin = defaultLayoutPlugin();
  const productTypeContext = useProductType();
  const { id } = useParams();
  useEffect(() => {
    if (productTypeContext?.types) {
      const type = productTypeContext.types.filter(
        (item) => item.id.toString() == id
      );
      productTypeContext.setType(type[0]);
    }
  }, [productTypeContext, id]);

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>{productTypeContext?.type?.name}</h1>
          </div>
        </div>
        <hr />
        {productTypeContext?.type?.pdf && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
              style={{
                height: "500px",
                width: "1000px",
                position: "absolute",
                left: "25%",
              }}
            >
              <Viewer
                fileUrl={productTypeContext?.type?.pdf}
                plugins={[newPlugin]}
              />
            </div>
          </Worker>
        )}
      </div>
    </div>
  );
};

export default ProductType;
