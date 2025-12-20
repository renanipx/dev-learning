import { rawData } from "./data/rawData";
import { convertData } from "./services/dataConverter";
import { exportToJSON } from "./utils/jsonExporter";

const normalizedData = convertData(rawData);
const jsonOutput = exportToJSON(normalizedData);

console.log(jsonOutput);
