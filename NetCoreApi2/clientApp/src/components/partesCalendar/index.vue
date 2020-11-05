<template src="./partesCalendar.html"/>
<script lang="ts" src="./partesCalendar.ts"/>
<style lang="scss" scoped>
    .row {
        display: flex;
        flex-direction: row;
        height: 10vh;
        position: relative;
    }

    .column{
        display: flex;
        flex-direction: column;
        text-align: center;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .double-column{
        flex-grow: 20;
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    
    .divPercent{
        border-left: solid;
        border-right: solid;
        flex-grow: 2;
        position:absolute;
    }
</style>