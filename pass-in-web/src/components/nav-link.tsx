import { ComponentProps } from "react";

// ComponentProps e utilizado para passar
interface navLinksProps extends ComponentProps<"a"> {
  name: string;
  to: string;
}

export const NavLink = (props: navLinksProps) => {
  return (
    <>
      {/*
        {...props} e utilizador para dizermos ao nosso component que pode receber ttodas as ancoras
        q o <a> pode receber como definimos em cima com o ComponentProps do react e especificando que 
        queriamos o <a>
      */}
      <a
        {...props}
        href={props.to}
        className="font-medium text-sm text-zinc-300"
      >
        {props.name}
      </a>
    </>
  );
};
