const mongoose = require("mongoose");
const usertree = require("../models/usertree");

const trees = [
  {
    name: "Evergreen conifer",
    family:"Basic Plants",
    shape: "narrow conical",
    origin: "West coast of USA (from Oregon to California",
    description:" This tree loves oceanic climate, with mild winters and cool summers. It prefers to grow sheltered from direct sun. In city parks it can only grow half as tall compared to the native environment. The hard, resistant wood is often used for critical building uses. Also known as Port Orford Cedar",
    availability:10,
    climate: "Mild",
    bloom: "Winter",
  },
  
  {
    name: "Scarlet Plume (Euphorbia fulgens)",
    family:"Flowers 2 ",
    shape: "Schrubby ",
    origin: "Mexico",
    description:" The Scarlet Plume is a shrubby plant that grows in partial shade or partial sun. It thrives in a warm, humid atmosphere with good light. It does not tolerate over§or under-watering. When leaves are removed, or when the stem is cut, a white, sappy fluid is emitted",
    availability:10,
    climate: "Warm and humid",
    bloom: "February",
  },

  {
    name: "Crape Myrtle",
    family:"Autumn ",
    shape: "Shrubby, broad spreading",
    origin: "West Asia (China, Japan)",
    description:"The Crape Myrtle is a very decorative schrub or small tree, because of the Summer blooming and thanks to the leaves that turn orange and red in the late Autumn. It grows on deep, fertile solls. It does not stand deep frost and cold",
    availability:10,
    climate: "Mild, warm",
    bloom: " October",
  },


  {
    name: "Tulitree",
    family:"Autumn ",
    shape: "Broad columnar",
    origin: "Northeast of North America",
    description:"The Tuliptree (Indiana, Kentucky and Tennessee State tree), called after the shape of the blossoms, is a very ancient species. It is drought-intolerant. The tall size of the trunk made Tuliptree the tree of choice for Native Americans to build long canoes. Today it is often found in city parks because of the beautiful Autumn colour",
    availability:10,
    climate: "Mild, temperate",
    bloom: "October",
  },
 

  {
    name: "Silky Oak",
    family:"Oceania 2",
    shape: "narrow conical",
    origin: "Eastern Australia",
    description:" The Silky Oak (also known as Australian, Silver-oak) grows fast when young but considerably slows down also in subtropical and dry forests, as it can withstand drought. It is a frost-intolerant species, so it needs protection when planted young. The wood is much appreciated for the building of musical instruments, particularly guitars. It used to be common also for external window joinery before the advent of aluminium",
    climate: "warm, temperate; frost-intolerant",
    bloom: "Winter",
  }
];

mongoose
  .connect("mongodb://localhost:27017/tree-trunks", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

usertree.insertMany(trees)
  .then(dbresult => {
    console.log("the trees have been inserted");
  })
  .catch(dberr => console.log(dberr));