import React from "react";

function Footer ({}){
return(
    <div className="bg-white p-10">
        <p className="text-base text-gray-600 text-center lg:-mr-72">
          Copyright © {new Date().getFullYear()} - Todos los derechos reservados por Dravita Tech
        </p>
    </div>
);
}
export default Footer;