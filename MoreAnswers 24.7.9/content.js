// Function to open the link based on the selected option
function openLink(selectedLabel) {
    var links = {
        'Test Site': 'https://manage.wix.com/dashboard/01fd661b-2ae7-49c1-8a95-5557920bac0d',
        'RunBook': 'https://manage.wix.com/dashboard/4b7cf3d1-ec2b-43c0-8528-6ad8e9fea47d/home'
    };

    var link = links[selectedLabel];
    if (link) {
        window.open(link, '_blank');
    }
}

// Function to handle dropdown selection
function dropdownSelection(event) {
    var selectedLabel = event.target.textContent;
    localStorage.setItem('defaultOption', selectedLabel);
    openLink(selectedLabel);
    updateButtonLabel(selectedLabel);
}

// Function to create the dropdown menu
function createDropdownMenu() {
    var dropdown = document.createElement('div');
    dropdown.classList.add('dropdown-menu');
    dropdown.style.position = 'absolute';
    dropdown.style.display = 'none';
    dropdown.style.backgroundColor = '#fff';
    dropdown.style.border = '1px solid #ccc';
    dropdown.style.borderRadius = '4px';
    dropdown.style.zIndex = 1001;

    var options = [
        { label: 'Test Site', link: 'https://manage.wix.com/dashboard/01fd661b-2ae7-49c1-8a95-5557920bac0d' },
        { label: 'RunBook', link: 'https://manage.wix.com/dashboard/4b7cf3d1-ec2b-43c0-8528-6ad8e9fea47d/home' }
    ];

    options.forEach(function(option) {
        var optionElement = document.createElement('div');
        optionElement.textContent = option.label;
        optionElement.style.padding = '10px';
        optionElement.style.cursor = 'pointer';
        optionElement.addEventListener('click', dropdownSelection);
        dropdown.appendChild(optionElement);
    });

    return dropdown;
}

// Function to handle button click
function buttonClicked() {
    var dropdown = document.querySelector('.dropdown-menu');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

// Function to update the button label and click behavior
function updateButtonLabel(label) {
    testButton.textContent = label;
    testButton.removeEventListener('click', buttonClicked);
    testButton.addEventListener('click', function() {
        openLink(label);
    });

    var dropdown = document.querySelector('.dropdown-menu');
    dropdown.style.display = 'none';
    updateDropdownPosition();
    updateArrowPosition();
}

// Create and style the test button
var testButton = document.createElement('button');
testButton.textContent = 'Test';
testButton.style.position = 'fixed';
testButton.style.top = '9px';
testButton.style.border = '2px solid';
testButton.style.borderRadius = '50px';
testButton.style.padding = '5px 11px';
testButton.style.zIndex = 1000;
document.body.appendChild(testButton);
testButton.addEventListener('click', buttonClicked);

// Create the dropdown arrow
var arrow = document.createElement('span');
arrow.textContent = ' ▾';
arrow.style.cursor = 'pointer';
arrow.style.position = 'fixed';
arrow.style.top = '11px';
arrow.style.fontSize = '14px';
arrow.style.zIndex = 1000;
document.body.appendChild(arrow);

// Create and append the dropdown menu
var dropdown = createDropdownMenu();
dropdown.style.display = 'none';
document.body.appendChild(dropdown);

// Set dropdown position relative to the button
function updateDropdownPosition() {
    dropdown.style.top = testButton.offsetTop + testButton.offsetHeight + 'px';
    dropdown.style.left = testButton.offsetLeft + 'px';
}

// Set arrow position relative to the button
function updateArrowPosition() {
    arrow.style.left = testButton.offsetLeft + testButton.offsetWidth + 'px';
}

updateDropdownPosition();
updateArrowPosition();
window.addEventListener('resize', function() {
    updateDropdownPosition();
    updateArrowPosition();
});

// Check local storage for default option
var defaultOption = localStorage.getItem('defaultOption');
if (defaultOption) {
    updateButtonLabel(defaultOption);
} else {
    arrow.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });
}

// Ensure other buttons remain unaffected
function createButton(label, top, left, clickHandler, id = '') {
    var button = document.createElement('button');
    button.textContent = label;
    button.style.position = 'fixed';
    button.style.top = top;
    button.style.left = left;
    button.style.border = '2px solid';
    button.style.borderRadius = '50px';
    button.style.padding = '5px 11px';
    button.style.zIndex = 1000;
    if (id) button.id = id;
    document.body.appendChild(button);
    button.addEventListener('click', clickHandler);
    return button;
}

// Original functions from the provided code
function originalButtonClicked() {
    try {
        var textAfterMSID = '';

        var searchPhrases = [
            "wix.com/dashboard/",
            "metaSiteId=",
            "User is on MSID",
            "User selected MSID",
            "MSID:",
            "MSID - ",
            "Site Meta ID*:",
            "Metasite ID:",
            "MSID*:",
            "MSID"
        ];

        function searchNotes(element, searchText) {
            if (element && element.textContent && element.textContent.includes(searchText)) {
                var index = element.textContent.indexOf(searchText);
                if (index !== -1) {
                    var potentialMSID = element.textContent.substr(index + searchText.length, 45);
                    var msidMatch = potentialMSID.match(/[a-fA-F0-9-]{36}/);
                    if (msidMatch) {
                        textAfterMSID = msidMatch[0];
                        return textAfterMSID;
                    }
                }
            }

            var children = element.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var result = searchNotes(children[i], searchText);
                    if (result) {
                        return result;
                    }
                }
            }
        }

        function findAndSearchThread() {
            var threadContainer = document.querySelector('.replies.events.timeline-items');
            if (threadContainer) {
                var notes = threadContainer.querySelectorAll('.content');
                for (var i = 0; i < searchPhrases.length; i++) {
                    var searchText = searchPhrases[i];
                    for (var j = 0; j < notes.length; j++) {
                        if (searchNotes(notes[j], searchText)) {
                            return;
                        }
                    }
                }
            } else {
                alert("No Chat Thread Found");
                return;
            }
        }

        findAndSearchThread();

        var element = document.querySelector('.wds_1_98_3_Text__root.wds_1_98_3_Text---size-4-tiny.wds_1_98_3_Text---skin-8-standard.wds_1_98_3_Text---weight-4-thin.wds_1_98_3_Text---list-style-9-checkmark.wds_1_98_3_TextComponent__text.wds_1_98_3_TextComponent---ellipsisLines-10-singleLine.user-id-text');
        if (!element || !element.outerText.trim()) {
            alert('No UUID Found');
        } else {
            window.open(
                'https://www.wix.com/supqa/lazierlink?queue=' +
                document.getElementsByClassName('assign-action')[0].innerText +
                '&msid=' + textAfterMSID +
                '&UUID=' + element.outerText,
                '_blank'
            );
        }
    } catch (error) {
        alert('Oops! Something went wrong: ' + error.message);
    }
}

function dashboardButtonClicked() {
    try {
        var textAfterMSID = '';

        var searchPhrases = [
            "metaSiteId=",
            "User is on MSID",
            "User selected MSID",
            "MSID:",
            "MSID - ",
            "Site Meta ID*:",
            "Metasite ID:",
            "MSID*:",
            "MSID"
        ];

        function searchNotes(element, searchText) {
            if (element && element.textContent && element.textContent.includes(searchText)) {
                var index = element.textContent.indexOf(searchText);
                if (index !== -1) {
                    var potentialMSID = element.textContent.substr(index + searchText.length, 45);
                    var msidMatch = potentialMSID.match(/[a-fA-F0-9-]{36}/);
                    if (msidMatch) {
                        textAfterMSID = msidMatch[0];
                        return textAfterMSID;
                    }
                }
            }

            var children = element.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var result = searchNotes(children[i], searchText);
                    if (result) {
                        return result;
                    }
                }
            }
        }

        function findAndSearchThread() {
            var threadContainer = document.querySelector('.replies.events.timeline-items');
            if (threadContainer) {
                var notes = threadContainer.querySelectorAll('.content');
                for (var i = 0; i < searchPhrases.length; i++) {
                    var searchText = searchPhrases[i];
                    for (var j = 0; j < notes.length; j++) {
                        if (searchNotes(notes[j], searchText)) {
                            return;
                        }
                    }
                }
            } else {
                alert("No Chat Thread Found");
                return;
            }
        }

        findAndSearchThread();

        window.open(
            'https://manage.wix.com/dashboard/' + textAfterMSID,
            '_blank'
        );

    } catch (error) {
        alert('Oops! Something went wrong: ' + error.message);
    }
}

function copyMSID() {
    try {
        var textAfterMSID = '';

        var searchPhrases = [
            "metaSiteId=",
            "User is on MSID",
            "User selected MSID",
            "MSID:",
            "MSID - ",
            "Site Meta ID*:",
            "Metasite ID:",
            "MSID*:",
            "MSID"
        ];

        function searchNotes(element, searchText) {
            if (element && element.textContent && element.textContent.includes(searchText)) {
                var index = element.textContent.indexOf(searchText);
                if (index !== -1) {
                    var potentialMSID = element.textContent.substr(index + searchText.length, 45);
                    var msidMatch = potentialMSID.match(/[a-fA-F0-9-]{36}/);
                    if (msidMatch) {
                        textAfterMSID = msidMatch[0];
                        return textAfterMSID;
                    }
                }
            }

            var children = element.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var result = searchNotes(children[i], searchText);
                    if (result) {
                        return result;
                    }
                }
            }
        }

        function findAndSearchThread() {
            var threadContainer = document.querySelector('.replies.events.timeline-items');
            if (threadContainer) {
                var notes = threadContainer.querySelectorAll('.content');
                for (var i = 0; i < searchPhrases.length; i++) {
                    var searchText = searchPhrases[i];
                    for (var j = 0; j < notes.length; j++) {
                        if (searchNotes(notes[j], searchText)) {
                            return;
                        }
                    }
                }
            } else {
                alert("No Chat Thread Found");
                return;
            }
        }

        findAndSearchThread();

        if (textAfterMSID) {
            navigator.clipboard.writeText(textAfterMSID).then(function () {
                var copyButton = document.getElementById('copy-msid-button');
                copyButton.textContent = 'Copied!';
                setTimeout(function () {
                    copyButton.textContent = 'Copy MSID';
                }, 5000);
            }, function (err) {
                alert('Failed to copy text: ', err);
            });
        } else {
            alert('MSID not found');
        }
    } catch (error) {
        alert('Oops! Something went wrong: ' + error.message);
    }
}

function scrollToClearDescription() {
    try {
        var threadContainer = document.querySelector('.replies.events.timeline-items');
        if (threadContainer) {
            var notes = threadContainer.querySelectorAll('.content');
            var lastNote = null;
            for (var i = 0; i < notes.length; i++) {
                var note = notes[i];
                if (note.textContent.includes('Clear description of the issue')) {
                    lastNote = note;
                }
            }
            if (lastNote) {
                lastNote.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                alert('Phrase "Clear description of the issue" not found');
            }
        } else {
            alert('No Chat Thread Found');
        }
    } catch (error) {
        alert('Oops! Something went wrong: ' + error.message);
    }
}

// New function to handle double click and copy text
function scrollToClearDescriptionAndCopy(event) {
    if (event.detail === 2) { // Double click
        try {
            var threadContainer = document.querySelector('.replies.events.timeline-items');
            if (threadContainer) {
                var notes = threadContainer.querySelectorAll('.content');
                var lastNote = null;
                for (var i = 0; i < notes.length; i++) {
                    var note = notes[i];
                    if (note.textContent.includes('Clear description of the issue')) {
                        lastNote = note;
                    }
                }
                if (lastNote) {
                    var textAfterMSID = '';

                    var searchPhrases = [
                        "wix.com/dashboard/",
                        "metaSiteId=",
                        "User is on MSID",
                        "User selected MSID",
                        "MSID:",
                        "MSID - ",
                        "Site Meta ID*:",
                        "Metasite ID:",
                        "MSID*:",
                        "MSID"
                    ];

                    function searchNotes(element, searchText) {
                        if (element && element.textContent && element.textContent.includes(searchText)) {
                            var index = element.textContent.indexOf(searchText);
                            if (index !== -1) {
                                var potentialMSID = element.textContent.substr(index + searchText.length, 45);
                                var msidMatch = potentialMSID.match(/[a-fA-F0-9-]{36}/);
                                if (msidMatch) {
                                    textAfterMSID = msidMatch[0];
                                    return textAfterMSID;
                                }
                            }
                        }
                        var children = element.children;
                        if (children) {
                            for (var i = 0; i < children.length; i++) {
                                var result = searchNotes(children[i], searchText);
                                if (result) {
                                    return result;
                                }
                            }
                        }
                    }

                    function findAndSearchThread() {
                        var threadContainer = document.querySelector('.replies.events.timeline-items');
                        if (threadContainer) {
                            var notes = threadContainer.querySelectorAll('.content');
                            for (var i = 0; i < searchPhrases.length; i++) {
                                var searchText = searchPhrases[i];
                                for (var j = 0; j < notes.length; j++) {
                                    if (searchNotes(notes[j], searchText)) {
                                        return;
                                    }
                                }
                            }
                        } else {
                            alert("No Chat Thread Found");
                            return;
                        }
                    }

                    findAndSearchThread();

                    console.log('textAfterMSID:', textAfterMSID);

                    if (!textAfterMSID) {
                        alert('textAfterMSID is empty');
                        return;
                    }

                    var userIDElement = document.querySelector('.wds_1_98_3_Text__root.wds_1_98_3_Text---size-4-tiny.wds_1_98_3_Text---skin-8-standard.wds_1_98_3_Text---weight-4-thin.wds_1_98_3_Text---list-style-9-checkmark.wds_1_98_3_TextComponent__text.wds_1_98_3_TextComponent---ellipsisLines-10-singleLine.user-id-text');
                    var userID = userIDElement ? userIDElement.outerText : null;

                    console.log('userID:', userID);

                    if (!userID) {
                        alert('userID is empty');
                        return;
                    }

                    var textToCopy = lastNote.textContent;

                    navigator.clipboard.writeText(textToCopy).then(function () {
                        alert('Note copied to clipboard! Opening AI....');
                        window.open('https://bo.wix.com/prompt-hub/projects/2a29eb5d-d611-4677-8549-19da6b53f005?promptId=c5f8978e-1548-458c-9b5c-e10158a08c91', '_blank');
                    }, function (err) {
                        alert('Failed to copy text: ' + err);
                    });
                } else {
                    alert('Phrase "Clear description of the issue" not found');
                }
            } else {
                alert('No Chat Thread Found');
            }
        } catch (error) {
            alert('Oops! Something went wrong: ' + error.message);
            console.error('Error details:', error);
        }
    }
}

// Create buttons for other functionalities
const buttonSpacing = 5; // Adjust the spacing between buttons to 5px
const firstButtonLeftPosition = 100; // Shift all buttons left of "Scroll to Description" 50px left

var scrollToDescriptionButton = createButton('Scroll to Description', '9px', `${firstButtonLeftPosition + 90}px`, scrollToClearDescription);
scrollToDescriptionButton.addEventListener('dblclick', scrollToClearDescriptionAndCopy);
createButton('Copy MSID', '9px', `${firstButtonLeftPosition + 250 + buttonSpacing}px`, copyMSID, 'copy-msid-button');
createButton('Dashboard', '9px', `${firstButtonLeftPosition + 350 + buttonSpacing * 2}px`, dashboardButtonClicked);
var createJiraButton = createButton('Create Jira', '9px', `${firstButtonLeftPosition + 450 + buttonSpacing * 3}px`, originalButtonClicked);
createJiraButton.id = 'createJiraButton'; // Set the ID for this button

// Update positions for the test button and dropdown arrow
testButton.style.left = `${firstButtonLeftPosition + 550 + buttonSpacing * 4}px`;
arrow.style.left = `${testButton.offsetLeft + testButton.offsetWidth + 5}px`; // Moved to the other side of the test button

// Load the toggle states and show/hide the buttons accordingly
chrome.storage.local.get(['runbookToggleState', 'dropdownToggleState'], function (data) {
    if (data.runbookToggleState !== undefined) {
        createJiraButton.style.display = data.runbookToggleState ? 'block' : 'none';
        adjustButtonPositions(data.runbookToggleState, data.dropdownToggleState);
    } else {
        createJiraButton.style.display = 'none'; // Default to hidden
        adjustButtonPositions(false, data.dropdownToggleState);
    }

    if (data.dropdownToggleState !== undefined) {
        const displayDropdown = data.dropdownToggleState ? 'block' : 'none';
        dropdown.style.display = displayDropdown;
        arrow.style.display = displayDropdown;
        testButton.style.display = displayDropdown;
    } else {
        dropdown.style.display = 'none'; // Default to hidden
        arrow.style.display = 'none';
        testButton.style.display = 'none';
    }
});

// Listen for messages from the popup script to update button visibility
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'updateCreateJiraButtonVisibility') {
        createJiraButton.style.display = request.isChecked ? 'block' : 'none';
        adjustButtonPositions(request.isChecked, dropdown.style.display === 'block');
    } else if (request.action === 'updateDropdownVisibility') {
        const displayDropdown = request.isChecked ? 'block' : 'none';
        dropdown.style.display = displayDropdown;
        arrow.style.display = displayDropdown;
        testButton.style.display = displayDropdown;
        adjustButtonPositions(createJiraButton.style.display === 'block', request.isChecked);
    }
});

function adjustButtonPositions(showJiraButton, showDropdown) {
    const buttonLeftPositions = {
        scrollToDescriptionButton: `${firstButtonLeftPosition + 90}px`,
        copyMSIDButton: `${firstButtonLeftPosition + 250 + buttonSpacing}px`,
        dashboardButton: `${firstButtonLeftPosition + 350 + buttonSpacing * 2}px`,
        createJiraButton: `${firstButtonLeftPosition + 450 + buttonSpacing * 3}px`,
        testButton: `${firstButtonLeftPosition + 550 + buttonSpacing * 4}px`
    };

    scrollToDescriptionButton.style.left = buttonLeftPositions.scrollToDescriptionButton;
    document.getElementById('copy-msid-button').style.left = buttonLeftPositions.copyMSIDButton;
    document.getElementById('dashboardButton').style.left = buttonLeftPositions.dashboardButton;

    if (showJiraButton) {
        createJiraButton.style.display = 'block';
        createJiraButton.style.left = buttonLeftPositions.createJiraButton;
        testButton.style.left = buttonLeftPositions.testButton;
    } else {
        createJiraButton.style.display = 'none';
        testButton.style.left = buttonLeftPositions.createJiraButton;
    }

    if (showDropdown) {
        testButton.style.display = 'block';
        arrow.style.display = 'block';
    } else {
        testButton.style.display = 'none';
        arrow.style.display = 'none';
    }

    updateDropdownPosition();
    updateArrowPosition();
}
