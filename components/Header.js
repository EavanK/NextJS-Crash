import headerStyle from "../styles/Header.module.css";

export default function Header() {
  // const x = 2;

  return (
    <div>
      <h1 className={headerStyle.title}>
        <span>WebDev</span> News
        <p className={headerStyle.description}>
          Keep up to date with the latest web dev news
        </p>
      </h1>

      {/* in Next.js using <style jsx></style> tag we can easily create conditional style */}
      {/* <style jsx>
        {`
          .title {
            color: ${x > 3 ? "red" : "blue"};
          }
        `}
      </style> */}
    </div>
  );
}
