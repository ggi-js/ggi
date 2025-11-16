// ==========================================================
// 1. 핵심 게임 데이터 (스토리, 선택지, 다음 장면)
// ==========================================================
const gameData = {
    'scene_start': {
        text: "🎉 오피스 미션 시작! 부장님이 퇴근 직전 회의실로 부릅니다. '이것 좀 정리하고 가게.'",
        choices: [
            { text: "① 닥쳐!.", nextScene: 'scene_bad' },
            { text: "② '조까!", nextScene: 'scene_good' },
            { text: "③ 느금마.", nextScene: 'scene_neutral' }
        ]
    },
    
    'scene_good': {
        text: "으응..? 부장님이 당황했다",
        choices: [
            { text: "'SEX를 크게 외친다'", nextScene: 'end_win' }
        ]
    },

    'scene_neutral': {
        text: "부장님이 멍하니 당신을 쳐다본다",
        choices: [
            { text: "'뭐, 왜'", nextScene: 'end_Sose' }
        ]
    },
    
    'scene_bad': {
        text: " what? 너는 해고야.",
        choices: [
            { text: "\"닥쳐\"을 한번 더 외친다", nextScene: 'scene_2' }
        ]
    },

    'scene_2': {
        text: "😴 다음 날 아침. 피곤에 쩔어 출근했는데, 부장님이 다시 부릅니다. '어제 왜 그랬니'",
        choices: [
            { text: "① ㅈㅅ..", nextScene: 'end_lose' },
            { text: "② 졸리니까 나 잔다", nextScene: 'end_win' }
        ]
    },
    
    'end_win': {
        text: "✨'당신은 현명한 선택으로 해고를 당했습니다 이제 경찰서로 갑시다'+100",
        choices: [] // 게임 종료
    },
    
    'end_lose': {
        text: "'💀 당신은 회사에서 부장의 따까리가 됩니다'-50",
        choices: [] // 게임 종료
    },
    'end_Sose': {
        text: "'💀 부장은 화나서 당신의 머리를 친다'+50",
        choices: [] // 게임 종료
    }
};

// ==========================================================
// 2. HTML 요소 및 상태 변수 정의
// ==========================================================
let currentScene = 'scene_start'; 
const storyTextDiv = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const startButton = document.getElementById('startButton');
const statusDisplay = document.getElementById('status-display');

// ==========================================================
// 3. 장면 전환 및 화면 업데이트 함수
// ==========================================================
function showScene(sceneKey) {
    const scene = gameData[sceneKey];
    
    // 1. 스토리 텍스트 업데이트
    storyTextDiv.innerHTML = scene.text;
    
    // 2. 선택지 버튼 초기화
    choicesContainer.innerHTML = '';
    
    // 3. 선택지가 있으면 버튼 생성 및 이벤트 추가
    if (scene.choices.length > 0) {
        scene.choices.forEach((choice) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            
            // 버튼 클릭 시 다음 장면으로 이동
            button.addEventListener('click', () => {
                currentScene = choice.nextScene; 
                showScene(currentScene); // 재귀 호출로 장면 전환
            });
            
            choicesContainer.appendChild(button);
        });
    } else {
        // 게임 종료 시 상태 표시 업데이트
        if (sceneKey === 'end_win') {
            statusDisplay.textContent = '경찰서 엔딩';
        } else if (sceneKey === 'end_lose') {
            statusDisplay.textContent = '회사에서 부장의 따까리가 되는 엔딩';
        } else if (sceneKey === 'end_Sose') {
            statusDisplay.textContent = '병원 엔딩';
        }
    }
}

// ==========================================================
// 4. 이벤트 리스너 및 초기화
// ==========================================================

// HTML의 '게임 시작' 버튼에 이벤트 추가 (처음 한 번만 실행됨)
startButton.addEventListener('click', () => {
    // 첫 장면('scene_start')을 보여주면서 게임 시작
    showScene('scene_start'); 
    statusDisplay.textContent = '현재 상태: 미션 진행 중';
});

// 초기화: 시작 버튼이 있는 상태로 대기
storyTextDiv.innerHTML = "환영합니다. 아래 '게임 시작' 버튼을 눌러 직장 스트레스 해소 미션을 시작하세요!";