import React from "react";
import Resize from "./Resize";


const YouTubeThumbnails = () => {
  const isPortrait = Resize();
  return ( 
    <div>
      {isPortrait ? ( 
    <div style={{fontSize: "28px",
      textAlign: "center",
      margin: '220px'
    }}>
      Работы из этой категории пока не загружены
      </div> )
      :
      (
            <div style={{fontSize: "20px",
            textAlign: "center",
            margin: '220vw 5vw'
    }}>
      Работы из этой категории пока не загружены
      </div>
      )}
    </div>
    );
};
 
export default YouTubeThumbnails;