import React from 'react';
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import {ASSET_IMAGES} from "../../utils/constants/paths";


const Logo = ({mini, mode, sx}) => {
    return (
        <Div sx={{display: "inline-flex", ...sx}}>
            <Link href={'/dashboards/misc'}>
                {
                    !mini ?
                        <img src={ mode === "light" ? `${ASSET_IMAGES}/logo.png` : `${ASSET_IMAGES}/logo.png`} alt="Jumbo React" width="140px" height="60px"/>
                        :
                        <img src={mode === "light" ? `${ASSET_IMAGES}/logo.png` : `${ASSET_IMAGES}/logo-short-white.png`} alt="Jumbo React" />
                }
            </Link>
        </Div>
    );
};

Logo.defaultProps = {
    mode: "light"
};

export default Logo;
