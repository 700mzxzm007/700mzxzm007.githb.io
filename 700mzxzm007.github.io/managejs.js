let staffList = [];
let prizeList = [];



document.addEventListener('DOMContentLoaded', () => {
    const savedSettings = localStorage.getItem('lotterySettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('staffSelection').value = settings.staffSelection;
        settings.prizeSettings.forEach(setting => addPrizeSetting(setting));
        document.getElementById('lotteryMode').value = settings.lotteryMode;
    }
});

function addPrizeSetting(setting = {}) {
    const container = document.getElementById('prize-settings-container');
    const newSetting = document.createElement('div');
    newSetting.classList.add('mb-3', 'prize-settings');
    newSetting.innerHTML = `
        <label for="prizeType" class="form-label">奖项</label>
        <select class="form-select" name="prizeType[]">
            <option value="一等奖" ${setting.prizeType === '一等奖' ? 'selected' : ''}>一等奖</option>
            <option value="二等奖" ${setting.prizeType === '二等奖' ? 'selected' : ''}>二等奖</option>
            <option value="三等奖" ${setting.prizeType === '三等奖' ? 'selected' : ''}>三等奖</option>
            <option value="安慰奖" ${setting.prizeType === '安慰奖' ? 'selected' : ''}>安慰奖</option>
        </select>
        <label for="prizeQuantity" class="form-label">数量</label>
        <input type="number" class="form-control" name="prizeQuantity[]" value="${setting.prizeQuantity || ''}" placeholder="数量">
        <label for="prizeItem" class="form-label">奖品</label>
        <input type="text" class="form-control" name="prizeItem[]" value="${setting.prizeItem || ''}" placeholder="奖品">
        <button type="button" class="btn btn-danger mt-2" onclick="removePrizeSetting(this)">删除</button>
        <button type="button" class="btn btn-warning mt-2" onclick="editPrizeSetting(this)">编辑</button>
    `;
    container.appendChild(newSetting);
}

function removePrizeSetting(button) {
    const prizeSettingDiv = button.closest('.prize-settings');
    prizeSettingDiv.remove();
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function addStaff() {
    const name = document.getElementById('staffName').value;
    const phone = document.getElementById('staffPhone').value;
    if (name && phone) {
        staffList.push({ name, phone });
        renderStaffList();
        document.getElementById('staffName').value = '';
        document.getElementById('staffPhone').value = '';
    } else {
        alert('请输入完整的人员信息');
    }
}

function renderStaffList() {
    const tbody = document.getElementById('staffList');
    tbody.innerHTML = '';
    staffList.forEach((staff, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${staff.name}</td>
            <td>${staff.phone}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="removeStaff(${index})">删除</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function removeStaff(index) {
    staffList.splice(index, 1);
    renderStaffList();
}

function addPrize() {
    const name = document.getElementById('prizeName').value;
    const image = document.getElementById('prizeImage').files[0];
    if (name && image) {
        const reader = new FileReader();
        reader.onload = function (e) {
            prizeList.push({ name, image: e.target.result });
            renderPrizeList();
            document.getElementById('prizeName').value = '';
            document.getElementById('prizeImage').value = '';
        };
        reader.readAsDataURL(image);
    } else {
        alert('请输入完整的奖品信息');
    }
}

function renderPrizeList() {
    const tbody = document.getElementById('prizeList');
    tbody.innerHTML = '';
    prizeList.forEach((prize, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${prize.name}</td>
            <td><img src="${prize.image}" alt="${prize.name}" style="width: 50px; height: 50px;"></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="removePrize(${index})">删除</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function removePrize(index) {
    prizeList.splice(index, 1);
    renderPrizeList();
}

function drawLottery() {
    if (staffList.length === 0 || prizeList.length === 0) {
        alert('请确保有足够的人员和奖品');
        return;
    }
    const winners = [];
    prizeList.forEach(prize => {
        const winnerIndex = Math.floor(Math.random() * staffList.length);
        winners.push({ prize: prize.name, winner: staffList[winnerIndex] });
    });
    renderWinners(winners);
}

function renderWinners(winners) {
    const winnerDiv = document.getElementById('winnerList');
    winnerDiv.innerHTML = '<h3>中奖名单</h3>';
    winners.forEach(winner => {
        const p = document.createElement('p');
        p.innerHTML = `奖品：${winner.prize} - 中奖者：${winner.winner.name} (${winner.winner.phone})`;
        winnerDiv.appendChild(p);
    });
}

function saveSettings() {
    const settings = collectSettings();
    localStorage.setItem('lotterySettings', JSON.stringify(settings));
    alert('设置已暂存');
}

function submitSettings() {
    const settings = collectSettings();
    localStorage.setItem('lotterySettings', JSON.stringify(settings));
    alert('设置已保存');
    showSection('staff-management');
}

function collectSettings() {
    const settings = {
        staffSelection: document.getElementById('staffSelection').value,
        prizeSettings: Array.from(document.querySelectorAll('.prize-settings')).map(setting => ({
            prizeType: setting.querySelector('select[name="prizeType[]"]').value,
            prizeQuantity: setting.querySelector('input[name="prizeQuantity[]"]').value,
            prizeItem: setting.querySelector('input[name="prizeItem[]"]').value
        })),
        lotteryMode: document.getElementById('lotteryMode').value
    };
    return settings;
}

document.addEventListener('DOMContentLoaded', () => {
    const savedSettings = localStorage.getItem('lotterySettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('staffSelection').value = settings.staffSelection;
        settings.prizeSettings.forEach(setting => addPrizeSetting(setting));
        document.getElementById('lotteryMode').value = settings.lotteryMode;
    }
});


function editPrizeSetting(button) {
    const prizeSettingToEdit = button.closest('.prize-settings');
    prizeSettingToEdit.querySelector('select[name="prizeType[]"]').disabled = false;
    prizeSettingToEdit.querySelector('input[name="prizeQuantity[]"]').disabled = false;
    prizeSettingToEdit.querySelector('input[name="prizeItem[]"]').disabled = false;

    button.textContent = '保存';
    button.onclick = function () {
        prizeSettingToEdit.querySelector('select[name="prizeType[]"]').disabled = true;
        prizeSettingToEdit.querySelector('input[name="prizeQuantity[]"]').disabled = true;
        prizeSettingToEdit.querySelector('input[name="prizeItem[]"]').disabled = true;

        button.textContent = '编辑';
        button.onclick = function () {
            editPrizeSetting(button);
        };
    };
}

function handleStaffSelectionChange() {
    const staffSelection = document.getElementById('staffSelection').value;
    const qrCodeContainer = document.getElementById('qr-code-container');
    const importedStaffContainer = document.getElementById('imported-staff-container');

    if (staffSelection === '现场人员') {
        qrCodeContainer.style.display = 'block';
        importedStaffContainer.style.display = 'none';
        generateQRCode();
    } else {
        qrCodeContainer.style.display = 'none';
        importedStaffContainer.style.display = 'block';
        loadImportedStaff();
    }
}

function generateQRCode() {
    const qrCodeElement = document.getElementById('qrcode');
    qrCodeElement.innerHTML = '';
    const qrCodeUrl = 'https://example.com/scan-signup'; // Replace with actual URL
    QRCode.toCanvas(qrCodeElement, qrCodeUrl, function (error) {
        if (error) console.error(error);
    });
}

function downloadQRCode() {
    const qrCodeElement = document.getElementById('qrcode').querySelector('canvas');
    const qrCodeDataUrl = qrCodeElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = 'qr_code.png';
    a.click();
}

function loadImportedStaff() {
    const importedStaffList = document.getElementById('importedStaffList');
    importedStaffList.innerHTML = ''; // Clear existing staff

    // Example data, replace with actual data loading logic
    const staffData = [
        { name: 'lsl', phone: '12345678901' },
        { name: 'zxd', phone: '21456789012' },
        { name: 'wys', phone: '22456789012' },
        { name: 'cbh', phone: '23456789012' }
    ];

    staffData.forEach(staff => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" name="selectedStaff" value="${staff.phone}"></td>
            <td>${staff.name}</td>
            <td>${staff.phone}</td>
        `;
        importedStaffList.appendChild(row);
    });
}

