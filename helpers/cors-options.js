const allowList = [
  "https://project-group-5-petly.netlify.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
