function getImageUrl(fileId) {
    if (fileId) {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w256`;
    }

    return "";
};

export { getImageUrl };