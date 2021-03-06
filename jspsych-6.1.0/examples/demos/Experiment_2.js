var timeline = [];
/* init connection with pavlovia.org */
var pavlovia_init = {
    type: "pavlovia",
    command: "init"
};
timeline.push(pavlovia_init);
/* define welcome message trial */
var welcome = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};


var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>This experiment is being conducted in PsychoPy. Your anonymous data will be saved on this computer and then stored securely on University of Edinburgh server. \nThe collection of personal data will be kept to a minimum to ensure anonymity is maintained.\nPlease confirm that you have read and understood the participant information sheet and consent to participant in this experiment by pressing the “Y” key." +
        "</div>" +
        "<p>Press any key to begin.</p>",
    post_trial_gap: 500,
};

var demographicBlock = {
    timeline: [{
            type: 'survey-text',
            questions: [{
                prompt: ageStimulus,
                value: ""
            }, ],
            post_trial_gap: 500,
        },
        {
            type: 'html-keyboard-response',
            stimulus: genderStimulus,
            choices: ['1', '2', '3', '4', '5', '6'],
            prompt: genderOptions,
            post_trial_gap: 500,
        },
        {
            type: 'html-keyboard-response',
            stimulus: ethnicityStimulus,
            choices: ['1', '2', '3', '4', '5', '6', '7', '8'],
            prompt: ethnicityOptions,
            post_trial_gap: 500,
        }
    ]
}


var debriefBlock = {
    type: "html-keyboard-response",
    stimulus: function () {

        var trials = jsPsych.data.get().filter({
            test_part: 'test'
        });
        var correct_trials = trials.filter({
            correct: true
        });
        var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
        var rt = Math.round(correct_trials.select('rt').mean());

        return "<p>You responded correctly on " + accuracy + "% of the trials.</p>" +
            "<p>Your average response time was " + rt + "ms.</p>" +
            "<p>Press any key to complete the experiment. Thank you!</p>";

    }
};


timeline.push(welcome);
timeline.push(instructions);
timeline.push(demographicBlock);

timeline.push(debriefBlock);
/* define debrief */

var pavlovia_finish = {
    type: "pavlovia",
    command: "finish"
};
timeline.push(pavlovia_finish);

/* start the experiment */
jsPsych.init({
    timeline: timeline,
    on_finish: function () {
        jsPsych.data.displayData();
    }
});