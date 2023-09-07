import sha256 from 'crypto-js/sha256';

export default function hash(data) {
    // 要加密的數據
    const dataToHash = data;

    const hash = sha256(dataToHash).toString();

    const shortHash = `${hash.substring(0, 4)}${hash.substring(hash.length - 4, hash.length)}`;

    return {
        hash,
        shortHash
    }
}