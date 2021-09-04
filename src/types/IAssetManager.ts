import IBalance from "./IBalance";

export interface IAssetManager {

    getBalance() : Promise<Array<IBalance> | null>
}