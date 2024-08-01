// 랜덤 색상 생성 함수
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 색상 대비 계산 함수 (Luminance)
function getLuminance(color) {
  const rgb = parseInt(color.slice(1), 16); // Convert hex to RGB
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// 색상 대비 비율 계산 함수
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// 색상 설정 함수
function setColors() {
  const body = document.body;
  let newBackgroundColor, newTextColor;
  let contrastRatio = 0;

  do {
    newBackgroundColor = getRandomColor();
    newTextColor = getRandomColor();
    contrastRatio = getContrastRatio(newBackgroundColor, newTextColor);
  } while (contrastRatio < 4.5); // WCAG AA level contrast ratio

  body.style.backgroundColor = newBackgroundColor;
  body.style.color = newTextColor;
}

// 페이지 배열
const pages = [
  'index.html',
  'page2.html',
  'page3.1.html',
  'page3.2.html',
  'page4.1.html',
  'page4.2.html',
  'page5.html',
  'page6.1.html',
  'page6.html',
  'page6.1.html',
  'page7.html',
  'page8.html',
  'page9.html',
  'page10.html',
];

// 페이지 전환 함수
function changePage(url) {
  window.location.href = url;
}

// 다음 페이지로 이동하는 함수
function goToNextPage() {
  const currentPage = window.location.pathname.split('/').pop(); // 현재 페이지 파일명 추출
  const currentIndex = pages.indexOf(currentPage);
  const nextIndex = (currentIndex + 1) % pages.length; // 마지막 페이지에서 첫 페이지로 순환
  const nextPage = pages[nextIndex];

  setColors();
  changePage(nextPage);
}

// 이전 페이지로 이동하는 함수
function goToPreviousPage() {
  const currentPage = window.location.pathname.split('/').pop(); // 현재 페이지 파일명 추출
  const currentIndex = pages.indexOf(currentPage);
  const prevIndex = (currentIndex - 1 + pages.length) % pages.length; // 첫 페이지에서 마지막 페이지로 순환
  const previousPage = pages[prevIndex];

  setColors();
  changePage(previousPage);
}

// 이미지의 위치를 랜덤하게 설정하는 함수
function setRandomPosition() {
  const profilePic = document.getElementById('profilePic');
  const content = document.getElementById('content');

  // 콘텐츠 영역의 크기와 위치를 가져옵니다.
  const contentRect = content.getBoundingClientRect();

  // 이미지의 크기를 가져옵니다.
  const picWidth = profilePic.offsetWidth;
  const picHeight = profilePic.offsetHeight;

  // 콘텐츠 영역의 크기와 위치
  const maxWidth = contentRect.width - picWidth - 20; // 여백 고려
  const maxHeight = contentRect.height - picHeight - 20; // 여백 고려

  // 중앙 영역을 피할 범위 설정
  const margin = 150; // 중앙 영역을 피할 여백 (픽셀 단위)
  const centerX = contentRect.width / 2;
  const centerY = contentRect.height / 2;

  // 중앙 영역을 피하기 위해 랜덤 위치 계산
  let randomX, randomY;
  do {
    randomX = Math.random() * maxWidth;
    randomY = Math.random() * maxHeight;
  } while (
    Math.abs(randomX + picWidth / 2 - centerX) < margin &&
    Math.abs(randomY + picHeight / 2 - centerY) < margin
  );

  // 이미지 위치 설정
  profilePic.style.left = `${randomX}px`;
  profilePic.style.top = `${randomY}px`;
}

// 페이지 로드 시 색상 설정과 위치 설정
document.addEventListener('DOMContentLoaded', () => {
  setColors();
  setRandomPosition();

  // 2초마다 이미지 위치를 랜덤하게 변경
  setInterval(setRandomPosition, 1700);
});

// 클릭 이벤트 리스너 등록
document.addEventListener('click', setColors);

// 다음 페이지 버튼 이벤트 리스너 등록
document
  .getElementById('nextButton')
  .addEventListener('click', function (event) {
    event.stopPropagation(); // 부모 요소의 클릭 이벤트가 실행되지 않도록 막음
    goToNextPage();
  });

// 이전 페이지 버튼 이벤트 리스너 등록
if (document.getElementById('prevButton')) {
  document
    .getElementById('prevButton')
    .addEventListener('click', function (event) {
      event.stopPropagation(); // 부모 요소의 클릭 이벤트가 실행되지 않도록 막음
      goToPreviousPage();
    });
}
