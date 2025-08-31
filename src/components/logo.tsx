type LogoProps = {
    width?: string;   // optional prop, defaults to "100px"
};

function Logo({ width = "100px" }: LogoProps) {
    return <div style={{ width }}>{/* you can use it here */}Logo</div>;
}

export default Logo;
