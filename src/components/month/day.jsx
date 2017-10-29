import { h, Component } from 'preact';

export default function (props) {
  return <td>
    {props.day.gregorian.date}
  </td>
}