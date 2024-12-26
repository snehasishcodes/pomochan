import { useState, useEffect, useRef } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { A as Link } from '@expo/html-elements';
import topbarStyles from '../styles/TopBarStyle';
import appbarStyle from '../styles/AppBarStyle';
import timerStyle from '../styles/TimerStyle';
import settingsStyle from '../styles/SettingsStyle';
import tasksStyle from '../styles/TasksStyle';
import ThemeText from '../ui/ThemeText';
import Button from '../ui/Button';
import storage from '../config/storage';
import Checkbox from '../ui/Checkbox';

export default function Pomodoro() {
    const [currentPage, setCurrentPage] = useState('timer'); // timer / settings / todo / stats

    const [currentTime, setCurrentTime] = useState(0); // current progress in time
    const [focusTime, setFocusTime] = useState((45 * 60)); // in seconds - 45 minutes default
    const [breakTime, setBreakTime] = useState((15 * 60)); // in seconds - 15 minutes default
    const [isRunning, setIsRunning] = useState(false); // whether the timer is running
    const [isBreak, setIsBreak] = useState(false); // if currently it's break time
    const [isPaused, setIsPaused] = useState(false); // whether the timer is paused
    const timerRef = useRef(null);

    useEffect(() => {
        storage.load({
            key: 'time'
        })
            .then((data) => {
                setFocusTime(parseInt(data.focusTime || 45 * 60));
                setBreakTime(parseInt(data.breakTime || 15 * 60));
            })
            .catch((err) => {
                console.error(err);
            });
    }, [storage]);

    // if any time is changed or by default set the time to current mode's full time as it's a backward timer
    useEffect(() => {
        setCurrentTime(isBreak ? breakTime : focusTime);
    }, [isBreak, breakTime, focusTime]);

    const startTimer = () => {
        setIsRunning(true);
        setIsPaused(false);
        timerRef.current = setInterval(() => {
            setCurrentTime((prev) => {
                const nextTime = prev - 1;
                if (nextTime <= 0) {
                    clearInterval(timerRef.current);
                    handleSessionComplete();
                    return 0;
                }
                return nextTime;
            });
        }, 1000);
    };

    const handleSessionComplete = () => {
        if (isBreak === true) {
            setIsBreak(false);
            setCurrentTime(focusTime);
            startTimer();
        }
        else {
            setIsBreak(true);
            setCurrentTime(breakTime);
            startTimer();
        }
    };

    const pauseTimer = () => {
        if (isPaused === true) return;
        clearInterval(timerRef.current);
        setIsPaused(true);
    };

    const resumeTimer = () => {
        if (isPaused === false) return;
        startTimer();
        setIsPaused(false);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setIsPaused(false);
        setCurrentTime(isBreak ? breakTime : focusTime);
    };

    const skipTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setIsPaused(false);
        handleSessionComplete();
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={{ flex: 1 }}>
            <TopBar openTasks={() => currentPage !== 'tasks' ? setCurrentPage('tasks') : setCurrentPage('timer')} openSettings={() => currentPage !== 'settings' ? setCurrentPage('settings') : setCurrentPage('timer')} />
            {
                currentPage === 'timer' ?
                    <>
                        <Timer
                            time={formatTime(currentTime)}
                            isBreak={isBreak === true}
                        />
                        <AppBar
                            isRunning={isRunning}
                            isPaused={isPaused}
                            onStart={startTimer}
                            onPause={pauseTimer}
                            onResume={resumeTimer}
                            onSkip={skipTimer}
                            onStop={stopTimer}
                        />
                    </>
                    :
                    <>
                        {
                            currentPage === 'settings' ?
                                <Settings
                                    ft={`${focusTime / 60}`}
                                    bt={`${breakTime / 60}`}
                                    setFT={setFocusTime}
                                    setBT={setBreakTime}
                                    onClose={() => setCurrentPage('timer')} />
                                :
                                <>
                                    {
                                        currentPage === 'tasks' ?
                                            <Tasks
                                                onClose={() => setCurrentPage('timer')}
                                            />
                                            : <></>
                                    }
                                </>
                        }
                    </>
            }
        </View>
    );
}

export function Timer({ time, isBreak = false }) {
    const [TIME, setTIME] = useState('00 : 00');
    const [BREAK, setBREAK] = useState(false);

    useEffect(() => {
        setTIME(time);
    }, [time]);

    useEffect(() => {
        setBREAK(isBreak === true);
    }, [isBreak]);

    return (
        <View style={timerStyle.container}>
            {
                BREAK === true ?
                    <View style={timerStyle.modeBox}>
                        <ThemeText style={[timerStyle.mode]}>Focus</ThemeText>
                        <ThemeText style={[timerStyle.modeActive]}>Break </ThemeText>
                    </View>
                    :
                    <View style={timerStyle.modeBox}>
                        <ThemeText style={[timerStyle.modeActive]}>Focus</ThemeText>
                        <ThemeText style={[timerStyle.mode]}>Break </ThemeText>
                    </View>
            }
            <View style={timerStyle.timerBox}>
                <ThemeText style={[timerStyle.timerText]}>
                    {TIME}
                </ThemeText>
            </View>
        </View>
    )
}

export function Settings({ ft = '45', bt = '15', setFT, setBT, onClose }) {
    const [focusTime, setFocusTime] = useState('45'); // in minutes
    const [breakTime, setBreakTime] = useState('15'); // in minutes too

    useEffect(() => {
        setFocusTime(ft);
        setBreakTime(bt);
    }, [ft, bt]);

    const saveChanges = () => {
        if (!focusTime || !breakTime) return;
        if (focusTime === '0' || focusTime === '00' || breakTime === '0' || breakTime === '00') return;
        if (focusTime.includes('.') || breakTime.includes('.')) return;

        setFT(parseInt(focusTime) * 60);
        setBT(parseInt(breakTime) * 60);

        storage.save({
            key: 'time',
            data: {
                focusTime: parseInt(focusTime) * 60,
                breakTime: parseInt(breakTime) * 60
            },
            expires: null
        });

        onClose();
    }

    const handleFTChange = (text) => {
        setFocusTime(text);
    }

    return (
        <View style={[settingsStyle.container]}>
            <View style={[settingsStyle.wrapper]}>
                <View style={settingsStyle.form}>
                    <ThemeText>Focus Time </ThemeText>
                    <TextInput
                        style={settingsStyle.numberInput}
                        keyboardType='numeric'
                        maxLength={2}
                        multiline={false}
                        placeholder={'Focus Time'}
                        placeholderTextColor={'gray'}
                        onChangeText={handleFTChange}
                    >
                        <ThemeText>{focusTime}</ThemeText>
                    </TextInput>
                </View>
                <View style={settingsStyle.form}>
                    <ThemeText>Break Time </ThemeText>
                    <TextInput
                        style={settingsStyle.numberInput}
                        keyboardType='numeric'
                        maxLength={2}
                        multiline={false}
                        placeholder={'Break Time'}
                        placeholderTextColor={'gray'}
                        onChangeText={setBreakTime}
                    >
                        <ThemeText>{breakTime}</ThemeText>
                    </TextInput>
                </View>

                <View style={settingsStyle.btns}>
                    <Button variant={'none'} textStyle={[{ fontSize: 24 }]} onPress={onClose}>
                        Cancel
                    </Button>

                    <Button textStyle={[{ fontSize: 24 }]} onPress={saveChanges}>
                        Save
                    </Button>
                </View>
            </View>

            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <ThemeText>by{' '}</ThemeText>
                <Link style={{ color: 'white', fontSize: 18, textDecorationLine: 'underline' }} href={'https://snehasish.xyz'}>sneh</Link>
            </View>
        </View>
    )
}

export function Tasks({ onClose }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState(null); // new task text

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        storage.load({
            key: 'tasks'
        })
            .then((data) => {
                setTasks(data?.tasks || []);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const addNewTask = () => {
        if (!newTask) return;

        storage.save({
            key: 'tasks',
            data: {
                tasks: [
                    {
                        id: `t-${Math.floor(Math.random() * 1000)}${Date.now()}`,
                        name: newTask,
                        completed: false,
                        added: Date.now()
                    },
                    ...tasks
                ]
            },
            expires: null
        });

        loadTasks();
        setNewTask(null);
    }

    const setTaskCompleted = (id) => {
        if (!id) return;

        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        const index = tasks.indexOf(task);
        tasks[index] = {
            ...task,
            completed: task.completed === true ? false : true
        }

        storage.save({
            key: 'tasks',
            data: {
                tasks: tasks
            },
            expires: null
        });

        loadTasks();
    }

    const deleteCompletedTasks = () => {
        const incompleteTasks = tasks.filter((task) => task.completed !== true);

        storage.save({
            key: 'tasks',
            data: {
                tasks: incompleteTasks
            },
            expires: null
        });

        loadTasks();
    }

    const handleNewTaskChange = (text) => {
        setNewTask(text);
    }

    return (
        <View style={[tasksStyle.container, { flex: 1 }]}>
            <View style={tasksStyle.menu}>
                <View style={tasksStyle.menuFirst}>
                    <Button type={'icon'} variant={'none'} size={20} color={'gray'} onPress={onClose}>
                        arrow-left
                    </Button>
                    <ThemeText style={[{ fontSize: 28 }]}>Tasks</ThemeText>
                </View>

                <View>
                    <Button type={'icon'} variant={'none'} size={20} color={'white'} onPress={deleteCompletedTasks}>
                        trash
                    </Button>
                </View>
            </View>

            <View style={tasksStyle.form}>
                <TextInput
                    style={tasksStyle.input}
                    maxLength={48}
                    multiline={false}
                    placeholder={'Enter your task'}
                    placeholderTextColor={'gray'}
                    onChangeText={handleNewTaskChange}
                >
                    <ThemeText>{newTask}</ThemeText>
                </TextInput>
                <Button type={'icon'} variant={'none'} size={20} style={[{ width: '15%' }]} onPress={addNewTask}>
                    plus
                </Button>
            </View>

            <ScrollView style={[tasksStyle.tasks]}>
                {
                    tasks?.map((task, i) => (
                        <Checkbox
                            key={i}
                            value={task.completed === true}
                            onValueChange={() => setTaskCompleted(task.id)}
                        >
                            {task.name}
                        </Checkbox>
                    ))
                }
            </ScrollView>
        </View >
    )
}

export function TopBar({ openTasks = () => { }, openSettings = () => { } }) {
    return (
        <View style={topbarStyles.topbar}>
            <View style={topbarStyles.branding}>
                <ThemeText style={[topbarStyles.brandingName]}>pomochan</ThemeText>
            </View>
            <View style={topbarStyles.btns}>
                <Button type={'icon'} size={16} onPress={openTasks}>
                    list-check
                </Button>

                <Button type={'icon'} size={16} onPress={openSettings}>
                    gear
                </Button>
            </View>
        </View>
    );
}

export function AppBar({ isRunning = false, isPaused = false, onStart = () => { }, onPause = () => { }, onResume = () => { }, onSkip = () => { }, onStop = () => { } }) {
    return (
        <View style={appbarStyle.appbar}>
            {
                isRunning === false ?
                    <Button style={[appbarStyle.startButton]} textStyle={[{ fontSize: 48 }]} onPress={onStart}>
                        Start
                    </Button>
                    :
                    <>
                        <Button style={[{ width: '30%' }]} type={'icon'} variant={'none'} size={60} onPress={onStop}>
                            stop
                        </Button>
                        {
                            isPaused === true ?
                                <Button style={[{ width: '30%' }]} type={'icon'} variant={'none'} size={60} onPress={onResume}>
                                    play
                                </Button>
                                :
                                <Button style={[{ width: '30%' }]} type={'icon'} variant={'none'} size={60} onPress={onPause}>
                                    pause
                                </Button>
                        }
                        <Button style={[{ width: '30%' }]} type={'icon'} variant={'none'} size={60} onPress={onSkip}>
                            forward-step
                        </Button>
                    </>
            }
        </View>
    );
}

