// utils/getGoodsImageUrl.js

/**
 * 상품 이미지 URL을 반환합니다.
 * - 업로드된 이미지: '/uploads' 또는 'http'로 시작하는 경우 그대로 반환
 * - 정적 이미지: '/images/goods-images/' 경로를 접두사로 추가
 * @param {string} image - 이미지 파일명 또는 URL
 * @returns {string} - 완전한 이미지 URL
 */
export function getGoodsImageUrl(image) {
    if (!image) return '';
    if (image.startsWith('/uploads') || image.startsWith('http')) {
      return image;
    }
    return `/images/goods-images/${image}`;
  }
  